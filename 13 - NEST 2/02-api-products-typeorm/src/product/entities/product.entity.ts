import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;
}
