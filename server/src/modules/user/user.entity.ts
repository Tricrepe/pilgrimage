import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column('varchar', { unique: true })
    username: string
    @Column()
    @Exclude()
    password: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }
    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password)
    }
}