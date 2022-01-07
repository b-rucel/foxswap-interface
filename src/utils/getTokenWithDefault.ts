import { ChainId, Token, WETH, TOKENS } from '@foxswap/sdk'
import { GOVERNANCE_TOKEN, ZERO_ONE_ADDRESS } from '../constants'

export default function getTokenWithDefault(chainId: ChainId, symbol: string): Token {
  symbol = symbol.toUpperCase()
  let token: Token

  switch (symbol) {
    case 'WETH':
    case 'WBNB':
    case 'WONE':
      token = WETH[chainId]
      break
    default:
      const retrievedToken = TOKENS[chainId].firstBySymbol(symbol)
      token = retrievedToken ? retrievedToken : new Token(chainId, ZERO_ONE_ADDRESS, 18, symbol, symbol)
      break
  }
  // console.log('getTokenWithDefault', TOKENS[chainId])

  if (
    (!token || token.address === ZERO_ONE_ADDRESS) &&
    [ChainId.HARMONY_MAINNET, ChainId.HARMONY_TESTNET].includes(chainId)
  ) {
    const govToken = GOVERNANCE_TOKEN[chainId]
    if (symbol.toUpperCase() === govToken.symbol?.toUpperCase()) {
      token = govToken
    }
  }

  return token
}
