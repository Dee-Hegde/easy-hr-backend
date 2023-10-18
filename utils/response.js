exports.generateResponse = (status, message, code, data) => {
  let response = {
    status: status,
    message: message,
    code: code,
    data: data,
  };
  return response;
};
