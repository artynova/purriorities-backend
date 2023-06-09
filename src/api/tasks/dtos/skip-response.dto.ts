import { PunishmentDto } from '../../users/dtos/punishment.dto';
import { RewardDto } from '../../users/dtos/reward.dto';

export class SkipResponseDto {
    reward: RewardDto;
    punishment: PunishmentDto;
}
