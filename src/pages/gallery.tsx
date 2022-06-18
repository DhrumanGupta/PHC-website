import { GetStaticProps, NextPage } from 'next'
import MetaDecorator from '../components/MetaDecorator'
import { getAllProjectData } from '../lib/project'
import type { MetaData } from '../lib/project'
import styles from '../styles/Alumni.module.css'
import Card from '../components/UI/Card'
import { AiFillGithub, AiOutlineEye } from 'react-icons/ai'

export const getStaticProps: GetStaticProps<{ data: MetaData[] }> = async (
  context
) => {
  const postData = await getAllProjectData()
  return {
    props: {
      data: postData,
    },
  }
}

const Gallery: NextPage<{ data: MetaData[] }> = ({ data }) => (
  <div className={`container-sm ${styles.pageContainer}`}>
    <MetaDecorator
      title={'Gallery'}
      description={
        "PSN Hack Club was founded in 2019. View all its members' projects here!"
      }
    />

    <p className={'subheader'}>Gallery</p>
    {/* <p className={`${styles.description} content`}>
      The PSN Hack Club has a growing list of experienced alumni that aim to
      grow the club and mentor new members
    </p> */}

    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
      {data.map((blogData) => (
        // @ts-ignore
        <Card className="!m-0" key={blogData.slug}>
          <h3 className="text-lg lg:text-xl">{blogData.title}</h3>
          {blogData.authors && <h4 className="text-lg lg:text-l">By {
              blogData.authors.map((author, index)=>
                <span key={index}>
                  <b>{author + ((index !== blogData.authors.length-1 && blogData.authors.length>2) ? ", " : " ")}</b>
                  {index===blogData.authors.length-2 && blogData.authors.length > 1 && "and "}
                </span>)
            }</h4> }
          <p>{blogData.description}</p>
          <span className="flex gap-3 mt-3">
            {blogData.source && (
              <a
                href={blogData.source}
                target="_blank"
                className="h-6 w-auto !text-black"
                rel="noreferrer"
              >
                <AiFillGithub className="h-full w-full duration-100 hover:text-red-500 hover:cursor-pointer" />
              </a>
            )}
            {blogData.demo && (
              <a
                href={blogData.demo}
                target="_blank"
                className="h-6 w-auto !text-black"
                rel="noreferrer"
              >
                <AiOutlineEye className="h-full w-full duration-100 hover:text-red-500 hover:cursor-pointer" />
              </a>
            )}
          </span>
        </Card>
      ))}
    </main>

    {/* {alumni.map((year) => (
      <React.Fragment key={year.year}>
        <p className={styles.yearHeader}>{year.year}</p>
        <div className={styles.alumniContainer}>
          {year.members.map((member) => (
            <AlumniCard
              {...member}
              year={year.year.toString().replace(/ /g, '')}
              key={member.name}
            />
          ))}
        </div>
      </React.Fragment>
    ))} */}
  </div>
)

export default Gallery
