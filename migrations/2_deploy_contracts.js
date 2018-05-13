const Voting = artifacts.require('./Voting.sol')

module.exports = deployer => {
  deployer.deploy(Voting)
}
