const _logger = {
  paramsExport(title, message, params = undefined) {
    this.log(title + message);
    if (params !== undefined) {
      if (params instanceof Object) {
        Object.values(params).forEach(param => this.log(param));
      } else if (params instanceof Array) {
        params.forEach(param => this.log(param));
      } else {
        cc.log(params);
      }
    }
  },
  log(message) {
    console.log(message);
  },
};

export default {
  FATAL(message, ...params) {
    _logger.paramsExport('【FATAL】', message, params);
  },
  ERROR(message, ...params) {
    _logger.paramsExport('【ERROR】', message, params);
  },
  WARN(message, ...params) {
    _logger.paramsExport('【WARN】', message, params);
  },
  INFO(message, ...params) {
    _logger.paramsExport('', message, params);
  },
  DEBUG(message, ...params) {
    _logger.paramsExport('', message, params);
  },
  TRACE(message, ...params) {
    _logger.paramsExport('', message, params);
  },
};
