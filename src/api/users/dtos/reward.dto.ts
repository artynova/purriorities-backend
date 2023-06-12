export class SkillRewardDto {
    id: string;
    levelExpGained = 0;
}

export class RewardDto {
    mainLevelExpGained = 0;
    skillRewards: SkillRewardDto[] = [];
    feedGained = 0;
    catnipGained = 0;
    /**
     * Taking 100 cap into account
     */
    trustGained = 0;
}
