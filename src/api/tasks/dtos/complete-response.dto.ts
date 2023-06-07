import { ReadQuestDto } from '../../quests/dtos/read-quest.dto';
import { RewardDto } from '../../users/dtos/reward.dto';

export class CompleteResponseDto {
    reward: RewardDto;
    newQuest: ReadQuestDto;
}
