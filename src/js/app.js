const EmptyIndicator = () => `
  <tr id='empty'>
    <td class="mdl-data-table__cell--non-numeric">No votes</td>
    <td class="mdl-data-table__cell--non-numeric">please vote</td>
  </tr>
`

const Item = ({ id, name, votes }) => `
  <tr id='brand${id}'>
    <td class="mdl-data-table__cell--non-numeric">${name}</td>
    <td id='#brand1'>${votes}</td>
  </tr>
`

const App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,
  init: () => App.initWeb3(),
  initWeb3: () => {
    // initialize web3
    if (typeof web3 !== 'undefined') App.web3Provider = web3.currentProvider
    else {
      //create a new provider and plug it directly into our local node
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      )
    }
    web3 = new Web3(App.web3Provider)
    App.displayAccount()
    return App.initContract()
  },
  displayAccount: () =>
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.account = account
        console.log(account)
        web3.eth.getBalance(account, (err, balance) => {
          if (err === null) {
            console.log(web3.fromWei(balance, 'ether') + ' ETH')
          }
        })
      }
    }),
  vote: () =>
    App.contracts.Voting.deployed().then(instance => {
      brandName = $('#brandName').val()
      if (brandName !== '') {
        instance.voteForCandidate(brandName, {
          from: App.account,
          gas: 500000
        })
        setTimeout(() => App.getData(), 80)
      }
    }),
  getData: () =>
    App.contracts.Voting.deployed().then(async instance => {
      const brands = []
      const brandsLength = await instance.getNumberOfBrands()

      if (brandsLength === 0) {
        $('#brands').empty()
        $('#brands').append(EmptyIndicator())
      }
      for (i = 0; i < brandsLength; i++) {
        const brand = await instance.getBrand(i)
        brands.push({
          id: brand[0].toNumber(),
          name: brand[1],
          votes: brand[2].toString()
        })
      }
      $('#brands').empty()
      App.setData(brands)
    }),
  initContract: () =>
    $.getJSON('Voting.json', votingArtifact => {
      // get the contract artifact file and use it to instantiate truffle contract abstraction
      App.contracts.Voting = TruffleContract(votingArtifact)
      // set the provider for our contracts
      App.contracts.Voting.setProvider(App.web3Provider)
      // retrieve the article from the contract
      return App.getData()
    }),
  setData: data =>
    data.map(Item).map(e => {
      $('#brands').append(e)
    })
}

$(() => {
  $(window).load(() => {
    App.init()
  })
})
