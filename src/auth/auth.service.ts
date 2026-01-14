import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth-dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private jwtService: JwtService 
  ) {}
    async create(createAuthDto: CreateAuthDto) {
        const hash = await bcrypt.hash(createAuthDto.password, 10);
        const createdUser = await this.userRepository.create({
            name: createAuthDto.name,
            email: createAuthDto.email,
            password: hash,
            role: createAuthDto.role,
        });
        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            role: createdUser.role,
        };
    }

    async signIn(loginAuthDto:LoginAuthDto): Promise<{ access_token: string }> {        
        const user = await this.findOneByName(loginAuthDto.name);
        const userData = await user.toJSON();        
        const isMatch = await bcrypt.compare(loginAuthDto.password, userData.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }        
        const payload = { sub: userData.id, username: userData.name, role: userData.role };        
        const token = await this.jwtService.signAsync(payload)
        return {
            access_token: token
        };
    }

    async findOneByName(name: string) {        
        const user = await this.userRepository.findOne({where: {name: name}})        
        if (user === null){
            throw new NotFoundException(`User '${name}' not found`);
        }
        return user
    }


}
