import { IsEmail } from 'class-validator';
import { ReacadoEntity } from 'src/recados/entities/recado.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  nome: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Uma pessoa pode ter enviado muitos recados (como"de")
  // Esses recados são relacionados ao campo "de " na entidade recado
  @OneToMany(() => ReacadoEntity, (recado) => recado.de)
  recadoEnviado: ReacadoEntity[];

  // Uma pessoa pode ter recebido muitos recados (como "para")
  // Esses recados são relacionados ao compo "para " na entidade recado
  @OneToMany(() => ReacadoEntity, (recado) => recado.para)
  recadosRecebidos: ReacadoEntity[];
}
