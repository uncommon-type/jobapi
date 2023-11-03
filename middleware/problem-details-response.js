const defaultProblemDetails = {
  type: 'about:blank',
  status: 500,
};

const getProblemDetailsForError = ({ error, problemTypes }) => {
  const problemType = problemTypes.find((problemType) => {
    return error instanceof problemType.matchErrorClass;
  });

  if (!problemType) {
    console.error(`${this.stack}`);
    return defaultProblemDetails;
  }

  const problemDetails = {
    ...problemType.details,
    ...problemType.occurrenceDetails(error),
  };

  return problemDetails;
}

export const configureProblemDetailsResponse = (problemTypes) => {
  return (error, request, response, next) => {
    if (response.headersSent) {
      return next(error);
    }

    const problemDetails = getProblemDetailsForError({ error, problemTypes });

    if (!problemDetails.status) {
      problemDetails.status = error.statusCode || 500;
    }

    response.set('Content-Type', 'application/problem+json');
    response.status(problemDetails.status).json(problemDetails);
  };
}
