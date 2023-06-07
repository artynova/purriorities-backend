export class OverdueQuestDto {
    id: string;
    totalTrustLost: number;
}

export class RunawayCatDto {
    nameId: string;
    feedTaken: number;
}

export class PunishmentDto {
    overdueQuests: OverdueQuestDto[];
    runawayCats: RunawayCatDto[];
}
