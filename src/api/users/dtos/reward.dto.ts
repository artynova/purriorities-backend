export class LevelingDto {
    level: number;
    exp: number;
    cap: number;
}

export class SkillLevelingDto extends LevelingDto {
    id: string;
}

export class RewardDto {
    mainLeveling: LevelingDto;
    /**
     * Only skills affected by the reward.
     */
    skillLeveling: SkillLevelingDto[];
    trustGained: number;
    feedGained: number;
    catnipGained: number;
}
