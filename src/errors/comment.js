const COMMENT_ERRORS = {
  COMMENT_ID_REQUIRED: "Comment ID is required.",
  MOVIE_ID_REQUIRED: "Movie ID is required.",
  COMMENT_TEXT_REQUIRED: "Comment text is required.",
  COMMENT_NOT_FOUND: "Comment not found.",
  NOT_COMMENT_AUTHOR:
    "Access denied. Only the author can modify or delete this comment.",
  INTERNAL_ERROR: "Internal server error while verifying comment ownership.",
};

export default COMMENT_ERRORS;