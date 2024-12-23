PGDMP  2                    |            BMS    17.2    17.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16384    BMS    DATABASE     �   CREATE DATABASE "BMS" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "BMS";
                     postgres    false            �            1259    16417    employee    TABLE       CREATE TABLE public.employee (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    email character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    "position" character varying NOT NULL,
    department character varying NOT NULL,
    salary numeric NOT NULL,
    "hireDate" timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.employee;
       public         heap r       postgres    false            �            1259    16416    employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.employee_id_seq;
       public               postgres    false    222                       0    0    employee_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;
          public               postgres    false    221            �            1259    16398    log    TABLE     (  CREATE TABLE public.log (
    id integer NOT NULL,
    "actorType" character varying NOT NULL,
    "actorId" integer NOT NULL,
    action character varying NOT NULL,
    "targetId" integer,
    "targetType" character varying,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.log;
       public         heap r       postgres    false            �            1259    16397 
   log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.log_id_seq;
       public               postgres    false    220                       0    0 
   log_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;
          public               postgres    false    219            �            1259    16386    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "phoneNumber" character varying NOT NULL,
    address character varying NOT NULL,
    "dateOfBirth" timestamp without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16385    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    218                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    217            e           2604    16420    employee id    DEFAULT     j   ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);
 :   ALTER TABLE public.employee ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            c           2604    16401    log id    DEFAULT     `   ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);
 5   ALTER TABLE public.log ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            a           2604    16389    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218                      0    16417    employee 
   TABLE DATA           �   COPY public.employee (id, "firstName", "lastName", email, "phoneNumber", "position", department, salary, "hireDate", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    222   �                  0    16398    log 
   TABLE DATA           h   COPY public.log (id, "actorType", "actorId", action, "targetId", "targetType", "timestamp") FROM stdin;
    public               postgres    false    220   �                  0    16386    users 
   TABLE DATA           �   COPY public.users (id, "firstName", "lastName", email, password, "phoneNumber", address, "dateOfBirth", "isActive") FROM stdin;
    public               postgres    false    218   ?!                  0    0    employee_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.employee_id_seq', 1, true);
          public               postgres    false    221                       0    0 
   log_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.log_id_seq', 6, true);
          public               postgres    false    219                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public               postgres    false    217            m           2606    16406 "   log PK_350604cbdf991d5930d9e618fbd 
   CONSTRAINT     b   ALTER TABLE ONLY public.log
    ADD CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.log DROP CONSTRAINT "PK_350604cbdf991d5930d9e618fbd";
       public                 postgres    false    220            o           2606    16426 '   employee PK_3c2bc72f03fd5abbbc5ac169498 
   CONSTRAINT     g   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.employee DROP CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498";
       public                 postgres    false    222            i           2606    16394 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public                 postgres    false    218            q           2606    16428 '   employee UQ_817d1d427138772d47eca048855 
   CONSTRAINT     e   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE (email);
 S   ALTER TABLE ONLY public.employee DROP CONSTRAINT "UQ_817d1d427138772d47eca048855";
       public                 postgres    false    222            k           2606    16396 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public                 postgres    false    218                  x������ � �         �   x�u�1
�0��Y:E.c˖�u�� K�E)�qH���������7|?r�?u���L�0:��B,!v	������n=�c���
�rm�V�:~�V,ecs@>�Z旞�gC���V�㣸l8y�"~ ?+8�         �   x�3������t�O��2�R�SR+srR���s9�S�K�R����R��9���������'�������\R��Z��\P���������ihii�k`�kh�```F�%\Ɯ�Iɜ��hk_� x�Bx     