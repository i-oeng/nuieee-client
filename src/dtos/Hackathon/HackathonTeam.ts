export interface HackathonTeamMember {
    fullName: string;
    nuId: string;
    iin: string;
    email: string;
    yearOfStudy: string;
    major: string;
}

export interface HackathonTeam {
    teamName: string;
    members: HackathonTeamMember[];
}

export interface RegisterTeamCommand {
    teamName: string;
    members: HackathonTeamMember[];
}
