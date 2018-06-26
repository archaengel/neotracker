/* @flow */
// $FlowFixMe
import { ClientError } from 'neotracker-shared-utils';

const ERROR_CODE_TO_MESSAGE = {
  PRIVATE_KEY_WIF_BASE58_ERROR:
    'Invalid WIF Private Key. Base58 decoding failed.',
  PRIVATE_KEY_WIF_BAD_FORMAT_ERROR: 'Invalid WIF Private Key. Invalid format.',
  PRIVATE_KEY_WIF_INVALID_FORMAT: 'Invalid WIF Private Key. Invalid format.',
  PRIVATE_KEY_WIF_UNKNOWN_CRYPTO_ERROR:
    'Invalid WIF Private Key. Unknown crypto error.',
  PRIVATE_KEY_WIF_VERIFICATION_ERROR:
    'Invalid WIF Private Key. WIF verification failed.',
  PRIVATE_KEY_WIF_UNKNOWN_ERROR: 'Invalid WIF Private Key. Unknown error.',
  PRIVATE_KEY_BAD_FORMAT_ERROR: 'Invalid Private Key.',
  PUBLIC_KEY_DERIVATION_ERROR:
    'Invalid Private Key. Failed to derive Public Key.',
  ADDRESS_DERIVATION_ERROR: 'Invalid Private Key. Failed to derive Address.',
  ADDRESS_BASE58_ERROR: 'Invalid Address. Base58 decoding failed.',
  ADDRESS_BAD_FORMAT_ERROR: 'Invalid Address. Invalid format.',
  ADDRESS_INVALID_ERROR: 'Invalid Address. Invalid format.',
  ADDRESS_INVALID_FORMAT: 'Invalid Address. Invalid format.',
  ADDRESS_UNKNOWN_CRYPTO_ERROR: 'Invalid Address. Unknown crypto error.',
  ADDRESS_VERIFICATION_ERROR: 'Invalid Address. Address verification failed.',
  ADDRESS_UNKNOWN_ERROR: 'Invalid Address. Unknown error.',
  INSUFFICIENT_FUNDS: 'Insufficient funds.',
  INPUT_LENGTH_UNSUPPORTED:
    'This transaction would require more than 255 inputs which is currently not supported.',
  OUTPUT_LENGTH_UNSUPPORTED:
    'This transaction would require more than 255 outputs which is currently not supported.',
  SCRIPT_HASH_UNKNOWN_CRYPTO_ERROR:
    'Invalid Script Hash (Address). Unknown crypto error.',
  BASE58_CHECK_DECODE_BASE58_ERROR: 'Base58 decoding failed.',
  BASE58_CHECK_DECODE_INVALID_FORMAT: 'Invalid format.',
  BASE58_CHECK_DECODE_UNKNOWN_CRYPTO_ERROR: 'Unknown crypto error.',
  BASE58_CHECK_DECODE_VERIFICATION_ERROR: 'Verification failed.',
  WIF_ENCODE_ERROR: 'Invalid Private Key. Encoding to WIF failed.',
  TRANSACTION_HASH_UNKNOWN_ERROR: 'Unknown error.',
  TRANSFER_TRANSACTION_UNKNOWN_ERROR:
    'Something went wrong creating the transfer transaction.',
  CLAIM_TRANSACTION_UNKNOWN_ERROR:
    'Something went wrong creating the claim transaction.',
  DECRYPT_KEYSTORE_UNSUPPORTED_ALGO: 'Invalid Keystore file.',
  DECRYPT_KEYSTORE_UNSUPPORTED_PBKDF2_PARAMETERS: 'Invalid Keystore file.',
  DECRYPT_KEYSTORE_DERIVED_KEY_ERROR:
    'Failed to create derived key from password. Password may be incorrect.',
  DECRYPT_KEYSTORE_UNKNOWN_CRYPTO_ERROR:
    'Invalid Keystore file. Unknown crypto error.',
  DECRYPT_KEYSTORE_DECIPHER_ERROR: 'Could not decrypt file.',
  DECRYPT_KEYSTORE_WRONG_PASSPHRASE: 'Wrong password.',
  DECRYPT_KEYSTORE_WRONG_ADDRESS:
    'Private Key address does not match Keystore address.',
  CREATE_NEP2_ERROR: 'Failed to create NEP2',
  EXTRACT_NEO_WEB_APP_INVALID_FILE: 'Invalid wallet file.',
  EXTRACT_NEO_WEB_APP_INVALID_JSON:
    'Invalid wallet file. Expected a JSON encoded file.',
  EXTRACT_NEO_WEB_APP_INVALID_FORMAT:
    'Invalid wallet file. Format is incorrect.',
  EXTRACT_NEO_WEB_APP_UNKNOWN_ERROR: 'Invalid wallet file. Unknown error.',
  EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_UNKNOWN_ERROR:
    'Unknown error. Possibly wrong password.',
  EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_WRONG_PASSPHRASE: 'Wrong password.',
  EXTRACT_KEYSTORE_INVALID_FILE: 'Invalid Keystore file.',
  EXTRACT_KEYSTORE_INVALID_FORMAT: 'Invalid Keystore file.',
  EXTRACT_KEYSTORE_INVALID_JSON:
    'Invalid wallet file. Expected a JSON encoded file.',
  EXTRACT_KEYSTORE_INVALID_NEP2:
    'Invalid wallet file. Expected a text file with an encrypted private key.',
  SEND_ASSET_NO_UNSPENT:
    'Must have at least one unspent transaction to transfer.',
  CLAIM_GAS_NO_UNCLAIMED:
    'Must have at least one unclaimed transaction to claim.',
  CREATE_PAPER_WALLET_WINDOW_OPEN_ERROR:
    'Failed to open window for Paper Wallet. It may have been blocked by a popup blocker.',
  NAME_TOO_SHORT_ERROR: 'Wallet name too short.',
  NAME_TOO_LONG_ERROR: 'Wallet name too long.',
};

type CodedClientErrorCode = $Keys<typeof ERROR_CODE_TO_MESSAGE>;

export default class CodedClientError extends ClientError {
  static PRIVATE_KEY_WIF_BASE58_ERROR = 'PRIVATE_KEY_WIF_BASE58_ERROR';

  static PRIVATE_KEY_WIF_BAD_FORMAT_ERROR = 'PRIVATE_KEY_WIF_BAD_FORMAT_ERROR';

  static PRIVATE_KEY_WIF_INVALID_FORMAT = 'PRIVATE_KEY_WIF_INVALID_FORMAT';

  static PRIVATE_KEY_WIF_UNKNOWN_CRYPTO_ERROR =
    'PRIVATE_KEY_WIF_UNKNOWN_CRYPTO_ERROR';

  static PRIVATE_KEY_WIF_VERIFICATION_ERROR =
    'PRIVATE_KEY_WIF_VERIFICATION_ERROR';

  static PRIVATE_KEY_WIF_UNKNOWN_ERROR = 'PRIVATE_KEY_WIF_UNKNOWN_ERROR';

  static PRIVATE_KEY_BAD_FORMAT_ERROR = 'PRIVATE_KEY_BAD_FORMAT_ERROR';

  static PUBLIC_KEY_DERIVATION_ERROR = 'PUBLIC_KEY_DERIVATION_ERROR';

  static ADDRESS_DERIVATION_ERROR = 'ADDRESS_DERIVATION_ERROR';

  static ADDRESS_BASE58_ERROR = 'ADDRESS_BASE58_ERROR';

  static ADDRESS_BAD_FORMAT_ERROR = 'ADDRESS_BAD_FORMAT_ERROR';

  static ADDRESS_INVALID_ERROR = 'ADDRESS_INVALID_ERROR';

  static ADDRESS_INVALID_FORMAT = 'ADDRESS_INVALID_FORMAT';

  static ADDRESS_UNKNOWN_CRYPTO_ERROR = 'ADDRESS_UNKNOWN_CRYPTO_ERROR';

  static ADDRESS_VERIFICATION_ERROR = 'ADDRESS_VERIFICATION_ERROR';

  static ADDRESS_UNKNOWN_ERROR = 'ADDRESS_UNKNOWN_ERROR';

  static INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS';

  static INPUT_LENGTH_UNSUPPORTED = 'INPUT_LENGTH_UNSUPPORTED';

  static OUTPUT_LENGTH_UNSUPPORTED = 'OUTPUT_LENGTH_UNSUPPORTED';

  static SCRIPT_HASH_UNKNOWN_CRYPTO_ERROR = 'SCRIPT_HASH_UNKNOWN_CRYPTO_ERROR';

  static BASE58_CHECK_DECODE_BASE58_ERROR = 'BASE58_CHECK_DECODE_BASE58_ERROR';

  static BASE58_CHECK_DECODE_INVALID_FORMAT =
    'BASE58_CHECK_DECODE_INVALID_FORMAT';

  static BASE58_CHECK_DECODE_UNKNOWN_CRYPTO_ERROR =
    'BASE58_CHECK_DECODE_UNKNOWN_CRYPTO_ERROR';

  static BASE58_CHECK_DECODE_VERIFICATION_ERROR =
    'BASE58_CHECK_DECODE_VERIFICATION_ERROR';

  static WIF_ENCODE_ERROR = 'WIF_ENCODE_ERROR';

  static TRANSACTION_HASH_UNKNOWN_ERROR = 'TRANSACTION_HASH_UNKNOWN_ERROR';

  static TRANSFER_TRANSACTION_UNKNOWN_ERROR =
    'TRANSFER_TRANSACTION_UNKNOWN_ERROR';

  static CLAIM_TRANSACTION_UNKNOWN_ERROR = 'CLAIM_TRANSACTION_UNKNOWN_ERROR';

  static DECRYPT_KEYSTORE_UNSUPPORTED_ALGO =
    'DECRYPT_KEYSTORE_UNSUPPORTED_ALGO';

  static DECRYPT_KEYSTORE_UNSUPPORTED_PBKDF2_PARAMETERS =
    'DECRYPT_KEYSTORE_UNSUPPORTED_PBKDF2_PARAMETERS';

  static DECRYPT_KEYSTORE_DERIVED_KEY_ERROR =
    'DECRYPT_KEYSTORE_DERIVED_KEY_ERROR';

  static DECRYPT_KEYSTORE_UNKNOWN_CRYPTO_ERROR =
    'DECRYPT_KEYSTORE_UNKNOWN_CRYPTO_ERROR';

  static DECRYPT_KEYSTORE_DECIPHER_ERROR = 'DECRYPT_KEYSTORE_DECIPHER_ERROR';

  static DECRYPT_KEYSTORE_WRONG_PASSPHRASE =
    'DECRYPT_KEYSTORE_WRONG_PASSPHRASE';

  static DECRYPT_KEYSTORE_WRONG_ADDRESS = 'DECRYPT_KEYSTORE_WRONG_ADDRESS';

  static CREATE_NEP2_ERROR = 'CREATE_NEP2_ERROR';

  static EXTRACT_NEO_WEB_APP_INVALID_FILE = 'EXTRACT_NEO_WEB_APP_INVALID_FILE';

  static EXTRACT_NEO_WEB_APP_INVALID_JSON = 'EXTRACT_NEO_WEB_APP_INVALID_JSON';

  static EXTRACT_NEO_WEB_APP_INVALID_FORMAT =
    'EXTRACT_NEO_WEB_APP_INVALID_FORMAT';

  static EXTRACT_NEO_WEB_APP_UNKNOWN_ERROR =
    'EXTRACT_NEO_WEB_APP_UNKNOWN_ERROR';

  static EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_UNKNOWN_ERROR =
    'EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_UNKNOWN_ERROR';

  static EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_WRONG_PASSPHRASE =
    'EXTRACT_PRIVATE_KEYS_NEO_WEB_APP_WRONG_PASSPHRASE';

  static EXTRACT_KEYSTORE_INVALID_FILE = 'EXTRACT_KEYSTORE_INVALID_FILE';

  static EXTRACT_KEYSTORE_INVALID_JSON = 'EXTRACT_KEYSTORE_INVALID_JSON';

  static EXTRACT_KEYSTORE_INVALID_FORMAT = 'EXTRACT_KEYSTORE_INVALID_FORMAT';

  static EXTRACT_KEYSTORE_INVALID_NEP2 = 'EXTRACT_KEYSTORE_INVALID_NEP2';

  static SEND_ASSET_NO_UNSPENT = 'SEND_ASSET_NO_UNSPENT';

  static CLAIM_GAS_NO_UNCLAIMED = 'CLAIM_GAS_NO_UNCLAIMED';

  static CREATE_PAPER_WALLET_WINDOW_OPEN_ERROR =
    'CREATE_PAPER_WALLET_WINDOW_OPEN_ERROR';

  static NAME_TOO_SHORT_ERROR = 'NAME_TOO_SHORT_ERROR';

  static NAME_TOO_LONG_ERROR = 'NAME_TOO_LONG_ERROR';

  code: CodedClientErrorCode;

  constructor(code: CodedClientErrorCode, originalError?: ?Error) {
    super(ERROR_CODE_TO_MESSAGE[code], originalError);
    this.code = code;
  }
}
