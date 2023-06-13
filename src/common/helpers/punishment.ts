import { CatOwnership } from '../../api/cats/entities/cat-ownership.entity';
import { RunawayCatDto } from '../../api/users/dtos/punishment.dto';
import { User } from '../../api/users/entities/user.entity';
import { LogicConfigService } from '../processed-config/logic-config.service';
import { Rarity } from '../types/enums';
import { randomFromArray } from './random';

/**
 * @returns a RunawayCatDto infromation object if subtraction resulted in a cat running away, null otherwise
 */
export function subtractTrust(
    trust: number,
    user: User,
    logicConfig: LogicConfigService,
    date: Date,
): null | RunawayCatDto {
    user.trust = Math.max(user.trust - trust, 0);
    if (dayMatches(date, user.lastRunawayDate)) return null; // runaways happen at most once a day

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
    result.feedTaken = Math.floor(user.feed * logicConfig.runawayFeedLossFactor(runaway.cat.rarity));
    user.feed -= result.feedTaken;
    user.lastRunawayDate = new Date();
    return result;
}

export function subtractTrustToday(trust: number, user: User, logicConfig: LogicConfigService) {
    return subtractTrust(trust, user, logicConfig, new Date());
}

function dayMatches(date1: Date, date2: Date) {
    if (date1.getFullYear() !== date2.getFullYear()) return false;
    if (date1.getMonth() !== date2.getMonth()) return false;
    return date1.getDate() === date2.getDate();
}
