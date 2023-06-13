export class OverdueQuestDto {
    id: string;
    trustLost = 0;
}

export class RunawayCatDto {
    nameId: string;
    feedTaken = 0;
}

export class PunishmentDto {
    overdueQuests: OverdueQuestDto[] = [];
    runawayCats: RunawayCatDto[] = [];
    extraTrustLost = 0;
}
