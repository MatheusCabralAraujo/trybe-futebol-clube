import TeamModel from '../database/models/team.model';
import Teams from '../interface/Teams.interface';

class TeamsServices {

  
    getAll = async (): Promise<Teams[]> => {
      const teams = await TeamModel.findAll();
      return teams;
    };
  }
  
  export default TeamsServices;
  