const PredictTheBlockHashChallenge = artifacts.require('PredictTheBlockHashChallenge');
const Miner = artifacts.require('Miner');

contract('PredictTheBlockHashChallenge', () => {
  it('can be solved', async () => {
    const challenge = await PredictTheBlockHashChallenge.new({ value: web3.toWei(1, 'ether') });
    const miner = await Miner.new();

    // guess with '0x'
    await challenge.lockInGuess('', { value: web3.toWei(1, 'ether') });
    // call miner for 256 blocks
    await miner.reset();
    /* eslint-disable */
    while (await miner.blocks() < 256) {
      await miner.mine();
    }
    /* eslint-enable */

    challenge.settle();

    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!',
    );
  });
});
