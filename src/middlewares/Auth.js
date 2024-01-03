module.exports = {
    private: async (req, res, next) => {

        if (!req.query.token && !req.body.token) {
            res.json({ notallowed: true })
            return
        }

        next()
    }
}