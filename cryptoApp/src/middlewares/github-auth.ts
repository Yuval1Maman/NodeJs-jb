import passport from "passport";
import { Strategy } from 'passport-github2';
import config from 'config';

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new Strategy(config.get('github'),
async (accessToken, refreshToken, profile, done) => {
    try {
        // try to fetch the user from the database
        // according to the user input
        const user = database.find(record => 
            record.email === email && 
            record. password === password);

        // if we didn't find a user in the database, inform Passport about it
        if (!user) {
            return done(null, false, { message: 'No such user' });
        }

        // if we did find a user in the database, inform passport about it
        return done(null, user);
    } catch (err) {
        // if any error occurred in the process, inform passport about it
        return done(err);
    }
}
));

export default passport;