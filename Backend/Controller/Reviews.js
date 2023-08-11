exports.createBlogReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, blogId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
    blogId,
  };

  const blog = await Blog.findById(blogId);

  const isReviewed = blog.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    blog.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    blog.reviews.push(review);
    blog.numOfReviews = blog.reviews.length;
  }

  let avg = 0;
  blog.ratings = blog.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  blog.ratings = avg / blog.reviews.length;

  await blog.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

///// Get All review of a blog

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.id);

  if (!blog) {
    return next(new ErrorHander("blog not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: blog.reviews,
  });
});

/// Delete Reviews

exports.deleteReviews = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.query.blogId);

  if (!blog) {
    return next(new ErrorHander("blog not found", 404));
  }

  const reviews = blog.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Blog.findByIdAndUpdate(
    req.query.blogId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
