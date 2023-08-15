import {
  AggregateOptions,
  FilterQuery,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export class MongoRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  findAll(query: FilterQuery<T>): Promise<T[]> {
    return this._repository.find(query).exec();
  }

  findById(id: string, projection?: ProjectionType<T>): Promise<T> {
    return this._repository.findById(id, projection).exec();
  }

  create(item) {
    return this._repository.create(item);
  }

  findOne(query: FilterQuery<T>): Promise<T> {
    return this._repository.findOne(query).exec();
  }

  findByIdAndUpdate(
    id: string,
    item: UpdateQuery<Partial<T>>,
    queryOptions?: QueryOptions,
  ) {
    return this._repository
      .findByIdAndUpdate(id, { $set: item }, { new: true, ...queryOptions })
      .exec();
  }

  findByIdAndUnset(
    id: string,
    item: UpdateQuery<Partial<T>>,
    queryOptions?: QueryOptions,
  ) {
    return this._repository
      .findByIdAndUpdate(id, { $unset: item }, { new: true, ...queryOptions })
      .exec();
  }

  findOneAndUpdate(
    query: FilterQuery<T>,
    item: UpdateQuery<Partial<T>>,
    queryOptions?: QueryOptions,
  ) {
    return this._repository
      .updateOne(query, { $set: item }, { new: true, ...queryOptions })
      .exec();
  }

  findByIdAndRemove(id: string) {
    return this._repository.findByIdAndRemove(id).exec();
  }

  updateMany(
    filterQuery: FilterQuery<T>,
    item: UpdateQuery<Partial<T>>,
    queryOptions?: QueryOptions,
  ) {
    return this._repository
      .updateMany(filterQuery, { $set: item }, { new: true, ...queryOptions })
      .exec();
  }

  updateOne(
    filterQuery: FilterQuery<T>,
    item: UpdateQuery<Partial<T>>,
    queryOptions?: QueryOptions,
  ) {
    return this._repository
      .updateOne(filterQuery, { $set: item }, { new: true, ...queryOptions })
      .exec();
  }

  deleteMany(query: FilterQuery<T>) {
    return this._repository.deleteMany(query).exec();
  }

  insertMany(items: T[]) {
    return this._repository.insertMany(items);
  }

  aggregate(pipeline: PipelineStage[], options?: AggregateOptions) {
    return this._repository.aggregate(pipeline, options).exec();
  }
}
