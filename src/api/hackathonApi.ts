import axiosInstance from '../services/axiosInstance';
import type {RegisterTeamCommand} from '../dtos/Hackathon/HackathonTeam';

export const hackathonApi = {
    registerTeam: async (teamData: RegisterTeamCommand) => {
        const response = await axiosInstance.post('/api/hackathon/register-team', teamData);
        return response.data;
    }
};
