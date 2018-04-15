const PredictTheFutureChallenge = artifacts.require('PredictTheFutureChallenge');
const PredictTheFutureSolver = artifacts.require('PredictTheFutureSolver');

contract('PredictTheFutureSolver', () => {
  it('should solve the challenge', async () => {
    const challenge = await PredictTheFutureChallenge.new({ value: web3.toWei(1, 'ether') });
    const solver = await PredictTheFutureSolver.new();
    const guess = 0;

    await solver.lockInGuess(challenge.address, guess, { value: web3.toWei(1, 'ether') });
    // call withdraw with no effect to go to next block in test
    await solver.withdraw();

    /* eslint-disable */
    while (!await challenge.isComplete()) {
      await solver.guess(challenge.address, guess);
    }
    /* eslint-enable */

    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!',
    );
  });
});
