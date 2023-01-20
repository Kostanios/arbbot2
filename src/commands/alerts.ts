import Logger from "bunyan";

export default async (args: any[], logger: Logger) => {
    try {

    }
catch (err) {
        logger.error( 'Could not process specific hour', err);
        process.exit(err.code);
    }
}