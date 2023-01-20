import Logger from 'bunyan';
import { Command } from 'commander';
import { LOG_LEVEL, LOGGER_CONFIG } from './config/config';
import { getLogger } from './logger';




const logger = getLogger(LOGGER_CONFIG);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json');

const program = new Command();

if (process.env.NODE_ENV !== 'test') {
    process.on('uncaughtException', (error) => {
        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
        require('./logger').getLogger(LOGGER_CONFIG).error(error, 'uncaughtException happened');

        process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
        // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
        require('./logger').getLogger(LOGGER_CONFIG).error(reason, 'unhandledRejection happened');

        process.exit(1);
    });
}

const actionHandle =
    <T>(modulePath: string): ((cmd: T & { configPath: string }) => void) =>
        (...cmd: (T & { configPath: string })[]): void => {
            const childLogger = logger.child({ modulePath });
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require(modulePath).default(cmd, childLogger);
        };

// Customise subcommand creation
program.createCommand = (name): Command => {
    const cmd = new Command(name);

    cmd.option(
        '-v, --verbosity <verbosityLvl>',
        'Set verbosity level for the console output' + " 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'",
        (verbosity) => {
            logger.level(Logger.levelFromName[verbosity ? verbosity.toLowerCase() : LOG_LEVEL]);
        },
    );

    return cmd;
};

// Begin program defenition
program.version(packageJson.version).name('DataDog Report Tool').usage('./datadog-reporting-tool <command> [options]');

program
    .command('alerts')
    .action(actionHandle<Command>('./commands/publish-day'));

program.parse(process.argv);
