module.exports = (req, res, next) => {
  if (req.sessions && !req.seesions.user) {
    return next()
  }

  return res.redirect('/app/dashboard')
}
