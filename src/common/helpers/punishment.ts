import { CatOwnership } from '../../api/cats/entities/cat-ownership.entity';
import { RunawayCatDto } from '../../api/users/dtos/punishment.dto';
import { User } from '../../api/users/entities/user.entity';
import { LogicConfigService } from '../processed-config/logic-config.service';
import { Rarity } from '../types/enums';
import { randomFromArray } from './random';

/**
 * @returns a RunawayCatDto infromation object if subtraction resulted in a cat running away, null otherwise
 */
export function subtractTrust(trust: number, user: User, logicConfig: LogicConfigService): null | RunawayCatDto {
    user.trust = Math.max(user.trust - trust, 0);
    if (isToday(user.lastRunawayDate)) return null; // runaways happen at most once a day

    let potentialRunaways: CatOwnership[] = [];
    let topRarity = Rarity.COMMON;
    for (const catOwnership of user.catOwnerships) {
        if (catOwnership.isAway || catOwnership.cat.rarity < topRarity) continue;
        if (catOwnership.cat.rarity > topRarity) {
            // when higher rarity cat is first found, bump the expected rarity of the runaway and reset the collection
            topRarity = catOwnership.cat.rarity;
            potentialRunaways = [];
        }
        potentialRunaways.push(catOwnership);
    }
    if (potentialRunaways.length === 0) return null;

    const runaway = randomFromArray(potentialRunaways);
    runaway.isAway = true; // updating through this reference also updates one within the user
    const result = new RunawayCatDto();
    result.nameId = runaway.cat.nameId;
    result.feedTaken = user.feed * logicConfig.runawayFeedLossFactor(runaway.cat.rarity);
    user.lastRunawayDate = new Date();
    return result;
}

function isToday(date: Date) {
    const now = new Date();
    if (now.getFullYear() !== date.getFullYear()) return false;
    if (now.getMonth() !== date.getMonth()) return false;
    return now.getDate() === date.getDate();
}
