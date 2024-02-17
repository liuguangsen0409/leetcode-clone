import React from 'react';
import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';

type ProblemPageProps = {
  problem: Problem
};

const ProblemPage:React.FC<ProblemPageProps> = ({ problem }) => {
  return (
    <>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </>
  )
}
export default ProblemPage;

// fetch the local data
// SSG static site generation
// getStaticPaths => it create the dynamic routes
export async function getStaticPaths () {
  const paths = Object.keys(problems).map((key) => ({
    params: {pid: key}
  }))

  return {
    paths,
    fallback: false // pid doesn't match jump to 404
  }
} 

// getStaticProps => it fetch the data
export async function getStaticProps ({ params }: { params: { pid: string } }) {
  const { pid } = params
  const problem = problems[pid]

  if (!problem) {
    return {
      notFound: true
    }
  }

  problem.handlerFunction = problem.handlerFunction.toString()

  return {
    props: {
      problem
    }
  }
}