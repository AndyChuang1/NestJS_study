import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskBatchDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let tasksService: jest.Mocked<TasksService>;

  beforeEach(async () => {
    const mockTasksService = {
      getTask: jest.fn(),
      getTaskById: jest.fn(),
      createTask: jest.fn(),
      batchCreateTask: jest.fn(),
      deleteTaskById: jest.fn(),
      updateTaskById: jest.fn(),
      updateStatusById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTask', () => {
    it('should return an array of tasks', () => {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Desc 1',
          status: TaskStatus.OPEN,
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Desc 2',
          status: TaskStatus.IN_PROGRESS,
        },
      ];
      tasksService.getTask.mockReturnValue(mockTasks);

      const getTaskDto: GetTaskDto = { status: TaskStatus.OPEN };
      const result = controller.getTask(getTaskDto);

      expect(result).toEqual(mockTasks);
      expect(tasksService.getTask).toHaveBeenCalledWith(getTaskDto);
    });
  });

  describe('getTasksById', () => {
    it('should return a single task', () => {
      const mockTask: Task = {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.OPEN,
      };
      tasksService.getTaskById.mockReturnValue(mockTask);

      const result = controller.getTasksById('1');

      expect(result).toEqual(mockTask);
      expect(tasksService.getTaskById).toHaveBeenCalledWith('1');
    });
  });

  describe('batchCreateTask', () => {
    it('should create multiple tasks', () => {
      const createTaskBatchDto: CreateTaskBatchDto = {
        data: [
          { title: 'Task 1', description: 'Desc 1' },
          { title: 'Task 2', description: 'Desc 2' },
        ],
      };
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Desc 1',
          status: TaskStatus.OPEN,
        },
        {
          id: '2',
          title: 'Task 2',
          description: 'Desc 2',
          status: TaskStatus.OPEN,
        },
      ];
      tasksService.createTask.mockImplementation((dto) => ({
        id: expect.any(String),
        ...dto,
        status: TaskStatus.OPEN,
      }));

      const result = controller.batchCreateTask(createTaskBatchDto);

      expect(result).toEqual(mockTasks);
      expect(tasksService.createTask).toHaveBeenCalledTimes(2);
      createTaskBatchDto.data.forEach((task, index) => {
        expect(tasksService.createTask).toHaveBeenNthCalledWith(
          index + 1,
          task,
        );
      });
    });
  });

  describe('createTask', () => {
    it('should create a single task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'New Desc',
      };
      const mockTask: Task = {
        id: '1',
        ...createTaskDto,
        status: TaskStatus.OPEN,
      };
      tasksService.createTask.mockReturnValue(mockTask);

      const result = controller.createTask(createTaskDto);

      expect(result).toEqual(mockTask);
      expect(tasksService.createTask).toHaveBeenCalledWith(createTaskDto);
    });
  });

  describe('delTasksById', () => {
    it('should delete a task', () => {
      controller.delTasksById('1');

      expect(tasksService.deleteTaskById).toHaveBeenCalledWith('1');
    });
  });

  describe('updateTasksById', () => {
    it('should update a task', () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Desc',
        status: TaskStatus.DONE,
      };

      controller.updateTasksById('1', updateTaskDto);

      expect(tasksService.updateTaskById).toHaveBeenCalledWith(
        '1',
        updateTaskDto,
      );
    });
  });

  describe('updateStatusById', () => {
    it('should update the status of a task', () => {
      const mockUpdatedTask: Task = {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.DONE,
      };
      tasksService.updateStatusById.mockReturnValue(mockUpdatedTask);

      const result = controller.updateStatusById('1', TaskStatus.DONE);

      expect(result).toEqual(mockUpdatedTask);
      expect(tasksService.updateStatusById).toHaveBeenCalledWith(
        '1',
        TaskStatus.DONE,
      );
    });
  });
});
