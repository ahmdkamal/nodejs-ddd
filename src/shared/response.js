exports.success = (res, options = {}) => {
    return res.status(options.status || 200).json({
        success: true,
        data: options.data || [],
        pagination: options.pagination || null,
        message: options.message || ''
    });
}

exports.failed = (res, next, options) => {
    return next(res.status(400).json({
        success: false,
        errors: options.errors || [],
        message: options.message || '',
    }));
}