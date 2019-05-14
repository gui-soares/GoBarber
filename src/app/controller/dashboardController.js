const { User } = require('../models')

class DashboardController {
  async userIndex (req, res) {
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('userDashboard', { providers })
  }

  providerIndex (req, res) {
    return res.render('providerDashboard')
  }
}

module.exports = new DashboardController()
