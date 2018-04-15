const GuessTheNewNumberChallenge = artifacts.require('GuessTheNewNumberChallenge');
const GuessTheNewNumberSolver = artifacts.require('GuessTheNewNumberSolver');

contract('GuessTheNewNumberSolver', () => {
  it('should solve the challenge', async () => {
    const challenge = await GuessTheNewNumberChallenge.new({ value: web3.toWei(1, 'ether') });
    const solver = await GuessTheNewNumberSolver.new();

    await solver.guess(challenge.address, { value: web3.toWei(1, 'ether') });

    assert(
      await challenge.isComplete() === true,
      'Challenge has not been completed!',
    );
  });
});
