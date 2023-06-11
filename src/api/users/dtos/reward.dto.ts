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
    /**
     * Value after getting the reward.
     */
    trust: number;
    /**
     * Value after getting the reward.
     */
    feed: number;
    /**
     * Value after getting the reward.
     */
    catnip: number;
}
