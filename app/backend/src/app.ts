import * as express from 'express';
import 'express-async-errors';
import HandleErr from './middleware/error.middleware';
import LoginRouter from './routes/login.route';
import MatchRouter from './routes/matches.route';
import TeamsRouter from './routes/teams.route';
import LeaderboardRouter from './routes/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/login', LoginRouter);
    this.app.use('/teams', TeamsRouter);
    this.app.use('/matches', MatchRouter);
    this.app.use('/leaderboard', LeaderboardRouter);
    this.app.use(HandleErr);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
