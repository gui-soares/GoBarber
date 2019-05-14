module.exports = (req, res, next) => {
  if (req.session && !req.session.user) {
    return next()
  }
  console.log(req.session.user.provider)
  if (req.session.user.provider === false) {
    return res.redirect('/app/userDashboard')
  }
  return res.redirect('/app/providerDashboard')
}
