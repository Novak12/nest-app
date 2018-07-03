import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromeRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        })
    }

    async validate(payload:JwtPayload,done:Function){
        const user=await this.authService.validateUser(payload.userNmae);
        if(!user){
            return done(new UnauthorizedException(), false);
        }
        done(null,user);
    }
}