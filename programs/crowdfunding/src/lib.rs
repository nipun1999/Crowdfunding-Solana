use anchor_lang::prelude::*;

declare_id!("F5N1bvjHeoK4cvLDJv9BRyPBJfXQL6Ui7LDAhzuhVB5w");

#[program]
pub mod crowdfunding {
    use super::*;
    pub fn create(ctx: Context<Create>, amount: u8,description: String) -> ProgramResult {
        let campaign = &mut ctx.accounts.campaign;
        campaign.campaign_amounts = amount;
        campaign.campaign_descriptions = description;
        campaign.campaign_fulfilled = 0;
        Ok(())
    }

    pub fn transfer_sol(ctx: Context<Transfer>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 64 + 64 + 64 + 64)]
    pub campaign: Account<'info, CampaignAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    pub campaign: Account<'info, CampaignAccount>,
    pub from: Account<'info,CampaignAccount>,
    pub to: Account<'info,CampaignAccount>
}

#[account]
pub struct CampaignAccount {
    pub campaign_amounts: u8,
    pub campaign_descriptions: String,
    pub campaign_fulfilled: u8,
}
