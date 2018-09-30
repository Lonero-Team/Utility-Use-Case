import DEXWallet from './DEXWallet'
import Coin from '../Coin'
// noinspection NpmUsedModulesInstalled
import WavesClient from 'Waves-api'
export default class WavesWallet extends DEXWallet {
  /**
   * Returns the balances for a Waves account.
   * @param credential The Waves api credentials.
   * @return {Promise} The account balances.
   */
  static _getBalanceForCredential(credential) {
    return new Promise((resolve, reject) => {
          const kraken = new WavesClient(credential.apiKey, credential.apiSecret, {timeout: 10000})
          // noinspection JSCheckFunctionSignatures
          waves.api('Balance', function(err, data) {
            if (err) {
              return reject(err)
            }
            let result = []
            let balances = data.result
            for (let symbol in balances) {
              let amount = balances[symbol]
              if (symbol.length === 4 && symbol[0] === 'X') {
                symbol = symbol.substr(1, 3)
              }
              result.push(new Coin(symbol, amount, 'Kraken'))
            }
            resolve(result)
          })
        }
    )
}
