module.exports = (req) => {
    const page = req.query.page || 1;
    const per_page = req.query.per_page || 15;

    return {
        page: page,
        limit: per_page,
    }
}