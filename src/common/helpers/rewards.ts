import { CatOwnership } from '../../api/cats/entities/cat-ownership.entity';
import { Quest } from '../../api/quests/entities/quest.entity';
import { Task } from '../../api/tasks/entities/task.entity';
import { LogicConfigService } from '../processed-config/logic-config.service';
import { ExpFormula } from '../types/formulas';
import { getLevelCap, roundForIncrement } from './formulas';

export function taskFeedReward(task: Task, logicConfig: LogicConfigService) {
    return Math.ceil(logicConfig.feedPerMinute(task.stage.quest.priority) * task.minutes);
}

export function getCompletedMinutes(quest: Quest) {
    let minutes = 0;
    for (const stage of quest.stages) {
        for (const task of stage.tasks) {
            if (task.completed) minutes += task.minutes;
        }
    }
    return minutes;
}

export interface ExperienceLevelable {
    level: number;
    levelExp: number;
}

// e.g., if exp is 500 / 200 and next cap is 600, bump level and leave exp at 300 / 600
export function normalizeLevelable(levelable: ExperienceLevelable, formula: ExpFormula) {
    let cap = getLevelCap(levelable.level, formula);
    while (levelable.levelExp >= cap) {
        levelable.levelExp -= cap;
        levelable.level++;
        cap = getLevelCap(levelable.level, formula);
    }
}

/**
 * @returns number of full added levels (difference between old and new level)
 */
export function addExperienceProper(exp: number, levelable: ExperienceLevelable, formula: ExpFormula) {
    levelable.levelExp += exp;
    const oldLevel = levelable.level;
    normalizeLevelable(levelable, formula);
    return levelable.level - oldLevel;
}

export function getExpBoost(catOwnerships: CatOwnership[], logicConfig: LogicConfigService) {
    let cumulative = 0;
    for (const catOwnership of catOwnerships) {
        if (catOwnership.isAway) continue;
        cumulative += logicConfig.catExpBoostFormula(catOwnership.cat.rarity)(catOwnership.level);
    }
    return roundForIncrement(cumulative, 0.01);
}
