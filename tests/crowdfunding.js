const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('crowdfunding', async () => {

  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  console.log(provider.wallet)

  const campaignWallet = anchor.web3.Keypair.generate();
  const campaign2Wallet = anchor.web3.Keypair.generate();
  const campaign3Wallet = anchor.web3.Keypair.generate();


  const program = anchor.workspace.Crowdfunding;

  it('Creates a campaign', async () => {

    const signature = await program.provider.connection.requestAirdrop(campaign2Wallet.publicKey, 2000000000);
    await program.provider.connection.confirmTransaction(signature);
    await program.rpc.create(100,"test campaign", {
      accounts: {
        campaign: campaignWallet.publicKey,
        user: campaign2Wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [campaign2Wallet,campaignWallet]
    });

    const campaign = await program.account.campaignAccount.fetch(campaignWallet.publicKey);
    console.log(campaign)
  });

  
  it('gets a campaign', async () => {
    let amount
    await program.rpc.transferSol({
      accounts: {
        campaign: campaignWallet.publicKey,
        from: campaign2Wallet.publicKey,
        to: campaign3Wallet.publicKey
      },
      signers: [campaignWallet]
    });

    const campaign = await program.account.campaignAccount.fetch(campaignWallet.publicKey);
    console.log(campaign)
  });


});
