import { PunishmentDto } from '../../users/dtos/punishment.dto';
import { RewardDto } from '../../users/dtos/reward.dto';

export class RefuseResponseDto {
    reward: RewardDto = new RewardDto();
    punishment: PunishmentDto = new PunishmentDto();
}
