exports.generateResponse = (status, message, data) => {
  let response = {
    status: status,
    message: message,
    data: data,
  };
  return response;
};
