/* @flow */
import * as React from 'react';

import classNames from 'classnames';
import { type HOC, compose, pure } from 'recompose';

import { type Theme } from '../../../styles/createTheme';
import { Markdown } from '../../../lib/markdown';

import { withStyles } from '../../../lib/base';

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: 0,
  },
});

const FAQ = `
## What is the NEO Tracker wallet?
The NEO Tracker wallet is a light wallet that lets NEO holders interact with
the Neo blockchain. You do not create an account or give us your funds to hold
onto. No data leaves your computer or your browser. We make it easy for you to
create, save, and access your information and interact with the Neo blockchain.


## How does it work?
Light wallet means that the NEO Tracker wallet does not require syncing locally with
the blockchain and instead, uses a remote server, namely NEO Tracker's blockchain
explorer, to fetch data like the transaction history or the amount of GAS
available to claim. Note that **none** of your personal data is ever sent to
NEO Tracker. Specifically, your Private Keys and encrypted Keystore files never
leave your local computer.


## How secure is it?
NEO Tracker **never** sends your Private Keys or encryped Keystore files
across the network. They are stored locally on your computer. Private Keys are
only ever stored in the current session's memory and are cleared between
sessions. Encrypted Keystore files are stored in local storage and persist across
sessions. If an attacker were to gain access to your browser's local storage, they
would additionally need the password to unlock your encrypted Keystore file in order
to gain access to your Private Keys and thus your balance.


## How can I trust the NEO Tracker application?
NEO Tracker is completely open-source and is available on [GitHub](https://github.com/neotracker/neotracker)
for you to verify. We serve NEO Tracker over SSL (HTTPS) which eliminates the
possibility of tampering with the Javascript code between our servers and your
browser. Still not sure? Download and use a local standalone version of the NEO Tracker wallet.
Go to our GitHub for the latest [release](https://github.com/neotracker/neotracker-wallet/releases)
and open it using your browser. Alternatively, you can build directly from the source.


## What if I forget my encrypted Keystore file's password or lose my Private Key?
NEO Tracker Wallet does not hold your keys for you. We cannot access accounts,
recover keys, reset passwords, nor reverse transactions. Protect your keys and
always check that you are on the correct URL. You are responsible for your security.


## What if I have questions, concerns, comments?
The best way to get in contact with us is to Direct Message us at our
official [Twitter](https://twitter.com/neotrackerio) or
[Facebook](https://www.facebook.com/neotracker.io/) accounts.


## We are not responsible for any loss.
Neo, neotracker.io and some of the underlying Javascript libraries we use are
under active development. While we have thoroughly tested, there is always the
possibility something unexpected happens that causes your funds to be lost.
Please do not invest more than you are willing to lose, and please be careful.
`;

type ExternalProps = {|
  className?: string,
|};
type InternalProps = {|
  classes: Object,
|};
type Props = {|
  ...ExternalProps,
  ...InternalProps,
|};
function WalletFAQView({ className, classes }: Props): React.Element<*> {
  return (
    <div className={classNames(className, classes.root)}>
      <Markdown source={FAQ} />
    </div>
  );
}

const enhance: HOC<*, *> = compose(
  withStyles(styles),
  pure,
);

export default (enhance(WalletFAQView): React.ComponentType<ExternalProps>);
