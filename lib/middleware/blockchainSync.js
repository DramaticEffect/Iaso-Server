/* eslint-disable new-cap, no-param-reassign */
const bcoin = require('bcoin');
const path = require('path');

const NETWORK = 'simnet';

module.exports = function getBlockchainSyncMiddleware() {
  const node = new bcoin.fullnode({
    network: 'simnet',
    db: 'leveldb',
    prefix: __dirname,
    nodes: [
      '10.7.64.53',
      'redsquad.dev.purse.io',
    ],
    host: '::',
    publicHost: '10.8.64.96',
  });

  (async () => {
    await node.open();

    await node.connect();
    node.startSync();
    node.chain.on('block', function(block) {
      console.log('block received: ' + block);
    });

    node.mempool.on('tx', function(tx) {
      console.log('added transaction: ' + transaction);
    });

    node.chain.on('full', function() {
      node.mempool.getHistory().then(console.log);
    });
  })();
  return async function blockchainSyncMiddleware(ctx, next) {
    ctx.pool = pool;

    await next();
  };
};
